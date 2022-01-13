const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user, refreshToken) {
  // the "sub" field means "subject", which is a unique identifier for each user
  console.log("user's id is " + user.id)
  return User.findOne({ spotifyId: user.id }).then((existingUser) => {
    if (existingUser) {
      existingUser.refreshToken = refreshToken;
      return existingUser.save();
    }
    const newUser = new User({
      name: user.display_name,
      spotifyId: user.id,
      refreshToken: refreshToken,
    });

    return newUser.save();
  });
}

const spotifyLogin = (req, res, spotifyApi) => {
  var html = spotifyApi.createAuthorizeURL(scopes)
  console.log(html)
  res.send({ url: html })
}

const callback = async (req, res, spotifyApi) => {
  const { code } = req.query;
  console.log(code)
  try {
    const data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token: accessToken, refresh_token: refreshToken } = data.body;
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.setRefreshToken(refreshToken);
    spotifyApi.getMe()
      .then((user) => {
        console.log('Some information about the authenticated user', user.body);
        return getOrCreateUser(user.body, refreshToken)
      }, (err) => {
        console.log('Something went wrong!', err);
      }).then((user) => {
        req.session.user = user;
        spotifyApi.resetAccessToken();
        spotifyApi.resetRefreshToken();
        res.redirect('/');
      }).catch((err) => {
        console.log(`Failed to log in: ${err}`);
        res.status(401).send({ err });
      });
  } catch (err) {
    res.redirect('/#/error/invalid token');
  }
}


function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  spotifyLogin,
  callback,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
