import { TppEnrollForm } from "@tripleplaypay/sdk-signup-forms";
import PropTypes from "prop-types";
import React, { Component, createRef } from "react";
import { getExampleData } from "./exampleData.js";

class FeatureLeftSide extends Component {
  /**
   * @param {import("react").PropsWithChildren<{
   *   submitClicked: () => void
   * }>} props
   */
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="col-md-3">
      <h2 className="featurette-heading fw-normal lh-1">
        Lorem ipsum ligula ridiculus
        <span className="text-body-secondary">
          convenire primis doming mandamus lorem amet.
        </span>
      </h2>
      <p className="lead">
        Some great placeholder content for the first featurette here. Imagine some exciting prose
        here.
      </p>
      <button onClick={this.props.submitClicked} id="tpp-signup-form-button" className="btn btn-lg btn-primary">Submit
      </button>
    </div>;
  }

  static propTypes = {
    submitClicked: PropTypes.func.isRequired,
  };
}

class TppSignupFormDiv extends Component {
  /**
   * @param {import("react").PropsWithChildren<{
   *   setForm: (tppEnrollForm: TppEnrollForm) => void
   *   setEnrollmentId: (resultEnrollmentId: string) => void
   * }>} props
   */
  constructor(props) {
    super(props);
    this.divRef = createRef();
  }

  componentDidMount() {
    console.log("TppEnrollForm.componentDidMount");
    let form = new TppEnrollForm({
      element: this.divRef.current,
      baseUrl: "http://localhost:8000", // for development
      // baseUrl: "sandbox", // for sandbox usage
    });
    this.props.setForm(form);
    form.once("submit", id => id && this.props.setEnrollmentId(id));
  }

  render() {
    return <div ref={this.divRef}></div>;
  }

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    setEnrollmentId: PropTypes.func.isRequired,
  };
}

/**
 * @type {Component<{}, {
 *   tppEnrollForm?: TppEnrollForm
 *   exampleData?: import("@tripleplaypay/sdk-signup-forms").Fields
 *   exampleDataSet: boolean
 *   resultEnrollmentId?: string
 * }>}
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exampleDataSet: false,
    };

    this.setForm = this.setForm.bind(this);
    this.setEnrollmentId = this.setEnrollmentId.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  /**
   * @param {TppEnrollForm?} tppEnrollForm
   */
  setForm(tppEnrollForm) {
    this.setState(s => ({ ...s, tppEnrollForm }));
  }

  /**
   * @param {string} resultEnrollmentId
   */
  setEnrollmentId(resultEnrollmentId) {
    console.log("there is now an enrollment id", resultEnrollmentId);
    this.setState(s => ({ ...s, resultEnrollmentId }));
    // optionally just immediately go to update page
    // tppEnrollForm.config.enrollmentId = enrollmentId
    // tppEnrollForm.mount();
  }

  async componentDidMount() {
    console.log("App.componentDidMount");
    let exampleData = await getExampleData();
    this.setState(s => ({ ...s, exampleData }));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("App.componentDidUpdate");
    let {
      tppEnrollForm,
      exampleData,
      exampleDataSet,
    } = this.state;

    if (!tppEnrollForm) return;
    if (!exampleData) return;
    if (exampleDataSet) return;

    this.setState(previous => {
      if (previous.exampleDataSet) return previous;
      App.setFormValues(tppEnrollForm, exampleData).then();
      return { ...previous, exampleDataSet: true };
    });
  }

  /**
   * @param {import("@tripleplaypay/sdk-signup-forms").TppEnrollForm} tppEnrollForm
   * @param {import("@tripleplaypay/sdk-signup-forms").Fields} exampleData
   * @returns {Promise<void>}
   */
  static async setFormValues(tppEnrollForm, exampleData) {
    await tppEnrollForm.setValues(exampleData);
    console.log("set form values");
  }

  async formSubmit() {
    let tppEnrollForm = this.state.tppEnrollForm;
    if (!tppEnrollForm) return;

    let enrollmentId = await tppEnrollForm.submit();
    if (enrollmentId) {
      this.setEnrollmentId(enrollmentId)
    }
  }

  render() {
    return <div className="container marketing">
      <div className="row featurette">
        <FeatureLeftSide submitClicked={() => this.formSubmit()} />
        <div className="col-md-9">
          <TppSignupFormDiv setForm={this.setForm} setEnrollmentId={this.setEnrollmentId} />
        </div>
      </div>

      <hr className="featurette-divider" />
    </div>;
  }
}
