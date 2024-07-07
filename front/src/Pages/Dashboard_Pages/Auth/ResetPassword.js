import "./styles/Login.css";

export default function ResetPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="formUser">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label for="email">email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-2 w-100"
                  >
                    send code verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
