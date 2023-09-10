const TopNavbar = ({ profilePic, title }: { profilePic: string; title: string }) => {
  return (
    <div className="top-navbar">
      {profilePic ? (
        <img
          src={profilePic}
          className="userprofile"
          alt="Profile"
          style={{ width: '45px', height: '45px', color: '#616161' }}
        />
      ) : null}
      <h2>{title}</h2>
    </div>
  )
}

export default TopNavbar
