import React, { Component } from "react";
import "../styles/Signup.css";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: false,
      errors: {},
      submitted: false,
    };
  }

  validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword, agreed } =
      this.state;
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!agreed) {
      errors.agreed = "You must agree to the terms and conditions";
    }

    return errors;
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();

    if (Object.keys(errors).length === 0) {
      this.setState({ submitted: true });
      console.log("Form submitted successfully:", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      });
      // Reset form
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreed: false,
        submitted: false,
      });
      alert("Signup successful!");
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      agreed,
      errors,
    } = this.state;

    return (
      <div className="signup-container">
        <div className="signup-card">
          <h2 className="signup-title">Create Your Account</h2>
          <p className="signup-subtitle">Join NewsMonkey Today</p>

          <form onSubmit={this.handleSubmit} className="signup-form">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  placeholder="John"
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="you@example.com"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Enter password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                className={`form-check-input ${
                  errors.agreed ? "is-invalid" : ""
                }`}
                id="agreed"
                name="agreed"
                checked={agreed}
                onChange={this.handleChange}
              />
              <label className="form-check-label" htmlFor="agreed">
                I agree to the Terms and Conditions
              </label>
              {errors.agreed && (
                <div className="invalid-feedback d-block">{errors.agreed}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Sign Up
            </button>
          </form>

          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <a href="/login" className="signup-link">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
