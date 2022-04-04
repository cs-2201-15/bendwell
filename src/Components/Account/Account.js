import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Avatar from "../Avatar/Avatar";
import "./account.scss";

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);

  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

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
    <div className="full-view-container">
      <div className="account-container">
        <div aria-live="polite">
          {loading ? (
            "Saving ..."
          ) : (
            <form onSubmit={updateProfile} className="form-widget">
              <Avatar
                className="image-container"
                url={avatar_url}
                size={200}
                onUpload={(url) => {
                  setAvatarUrl(url);
                  updateProfile({ username, avatar_url: url });
                }}
              />
              <div className="info-container">
                <h3 className="email-container">
                  <div className="email-text">Email: </div>
                  {session.user.email}
                </h3>
                <h3 htmlFor="username" className="name-text">
                  Name:
                  <input
                    id="username"
                    type="text"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                  />{" "}
                </h3>
              </div>

              <div>
                <button className="edit-profile-button" disabled={loading}>
                  Update profile
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
