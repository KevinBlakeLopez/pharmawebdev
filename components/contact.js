import { useState } from "react";

import sanitizeHtml from "sanitize-html";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    _honeypot: false,
  });

  const [errors, setErrors] = useState({});

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.firstName) {
      formErrors.firstName = "First name is required!";
    }
    if (!formData.lastName) {
      formErrors.lastName = "Last name is required!";
    }
    if (!formData.email) {
      formErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
    }
    if (!formData.message) {
      formErrors.message = "Message is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formSubmission = {
      Name: sanitizeHtml(formData.firstName + " " + formData.lastName),
      Email: sanitizeHtml(formData.email),
      Message: sanitizeHtml(formData.message),
    };

    if (formData["_honeypot"] === true) {
      formSubmission["_honeypot"] = formData["_honeypot"];
    }

    fetch(`https://submit-form.com/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formSubmission),
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
    setFormSubmitted(true);
  };

  return (
    <>
      <div className="mx-auto lg:flex md:gap-12 justify-between md:mt-12">
        <section className="md:w-[600px]">
          {formSubmitted ? (
            <div>
              <p className="text-xl">Thanks for your message!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="checkbox"
                name="_honeypot"
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
                onClick={() =>
                  setFormData({
                    ...formData,
                    _honeypot: !formData["_honeypot"],
                  })
                }
                value={formData["_honeypot"]}
              />
              <input
                type="hidden"
                name="_email.subject"
                value="Contact Form Submission"
              />

              <div className="md:flex md:gap-4 justify-between mb-5">
                <div className="md:w-1/2">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="text-xl py-1.5 pl-2 border-2 w-full mb-5 md:mr-8 md:mb-0 lg:mb-0"
                    required="required"
                    aria-required="true"
                  />
                  {errors.firstName && <p>{errors.firstName}</p>}
                </div>

                <div className="md:w-1/2">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="text-xl py-1.5 pl-2 border-2 w-full mb-5 md:mr-8 md:mb-0 lg:mb-0"
                    required="required"
                    aria-required="true"
                  />
                  {errors.lastName && <p>{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="text-xl py-1.5 pl-2 border-2 w-full mb-5"
                  required="required"
                  aria-required="true"
                />

                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Inquiry"
                  className="text-xl py-1.5 pl-2 mb-5 border-2 w-full h-36"
                  value={formData.message}
                  onChange={handleChange}
                  required="required"
                  aria-required="true"
                ></textarea>
                {errors.message && <p>{errors.message}</p>}
              </div>

              <section className="md:flex justify-between">
                <div
                  className="mb-8 bg-primary md:w-48 cursor-pointer"
                  id="edit-actions"
                >
                  <input
                    className="text-lg py-2 pl-7 text-white"
                    type="submit"
                    id="edit-actions-submit"
                    name="submit"
                    value="SEND MESSAGE"
                  />
                </div>
              </section>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
