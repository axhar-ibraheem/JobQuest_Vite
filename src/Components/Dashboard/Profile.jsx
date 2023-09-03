import FormRow from "../Auth/FormRow";

const Profile = () => {
  return (
    <div className="pt-28 max-w-6xl w-11/12 mx-auto">
         <div className="mb-2 text-center">
            <h1 className="text-3xl font-semibold tracking-wider text-blue-900">Profile</h1>
        </div>
      <form className="bg-white p-4 grid md:grid-cols-2 gap-x-3 mx-auto rounded-md shadow-md">
        <FormRow
          label="first Name"
          input={{
            type: "text",
            id: "firstname",
            name : "firstname"
          }}
          
        />
        <FormRow
          label="last name"
          input={{
            type: "text",
            id: "lastname",
            name : "lastname"
          }}
         
        />
          <FormRow
          label="email"
          input = {{
            type : "email",
            id: "email",
            placeholder: "example@gmail.com",
            name: "email"
          }}
         
        />
         <FormRow
          label="location"
          input ={{
            type: "text",
            id: "location",
            name : "location"
          }}
        />
        <button className="bg-blue-900 tracking-wider text-white px-4 py-2 my-3 rounded-md capitalize">update profile</button>
      </form>
    </div>
  );
};

export default Profile;
