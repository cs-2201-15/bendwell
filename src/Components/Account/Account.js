import { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabaseClient";
import Avatar from "../Avatar/Avatar";
import "./account.scss";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  const [avatar_url, setAvatarUrl] = useState(null);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  const handleAddPhoto = (event) => {
    hiddenFileInput.current.click();
  };

  const onUpload = (url) => {
    console.log(url);
    updateProfile({ username, avatar_url: url });
    setAvatarUrl(url);
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    onUpload(fileUploaded);
    console.log(event.target.files);
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);

        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="account-container">
        <div aria-live="polite">
          {loading ? (
            "Saving ..."
          ) : (
            <form onSubmit={updateProfile} className="form-widget">
              {/* <img src={avatar_url} alt="txt" />
              <button onClick={handleAddPhoto}>Upload your photo!</button>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              ></input> */}
              <Avatar
                className="image-container"
                url={avatar_url}
                size={150}
                onUpload={(url) => {
                  setAvatarUrl(url);
                  updateProfile({ username, avatar_url: url });
                }}
              />
              <div>
                <h3>Email: {session.user.email}</h3>
              </div>
              <div>
                <h3 htmlFor="username">Name: </h3>
                <input
                  id="username"
                  type="text"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <button className="edit-profile-button" disabled={loading}>
                  Update profile
                </button>
              </div>
            </form>
          )}
          <button
            type="button"
            className="edit-profile-button"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
