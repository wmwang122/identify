const user = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    get("/api/", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);