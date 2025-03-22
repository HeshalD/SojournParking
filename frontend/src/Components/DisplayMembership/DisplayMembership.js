import React, { useEffect, useState } from "react";
import axios from "axios";
import Member from "../Membership/Membership";

const URL = "http://localhost:5000/member";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function DisplayMembership() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setMembers(data.members));
  }, []);

  return (
    <div className="membership-page">
      <div className="membership-container">
        {members.length > 0 ? (
          members.map((user, i) => (
            <Member key={i} user={user} />
          ))
        ) : (
          <p>No Members Found</p>
        )}
      </div>
    </div>
  );
}

export default DisplayMembership;