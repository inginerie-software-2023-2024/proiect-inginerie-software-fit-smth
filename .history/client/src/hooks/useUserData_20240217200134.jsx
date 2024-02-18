// Custom hook for fetching user data
function useUserData(username) {
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const fetchUserData = async () => {
        // Fetch user data logic here
      };
  
      if (username) {
        fetchUserData();
      }
    }, [username]);
  
    return userData;
  }
  
  // Custom hook for fetching user meals
  function useUserMeals(username) {
    const [userMeals, setUserMeals] = useState([]);
  
    useEffect(() => {
      const getUserMealsData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/food/getUserMeals/${username}`);
          if (response.data.Status === 'Error') {
            setUserMeals([]);
          } else if (response.data.data && Array.isArray(response.data.data)) {
            setUserMeals(response.data.data);
          } else {
            console.error('Expected an array for user meals, but got:', typeof response.data.data);
            setUserMeals([]);
          }
        } catch (error) {
          console.error("Fetching user meals failed:", error);
          setUserMeals([]);
        }
      };
  
      if (username) {
        getUserMealsData();
      }
    }, [username]);
  
    return userMeals;
  }
  