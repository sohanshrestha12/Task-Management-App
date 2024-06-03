import defaultUser from '../assets/images/defaultUser.jpg'
const DefaultUser = () => {
  return (
    <>
      <img
        className="h-full w-full rounded-full"
        src={defaultUser}
        alt="404 not found"
      ></img>
    </>
  );
}

export default DefaultUser
