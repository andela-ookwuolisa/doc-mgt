import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { updateDocument } from '../actions/DocumentActions';

/**
 *
 * @class UpdateDocument
 * @extends {Component}
 */
export class UpdateDocument extends Component {
  /**
   * Creates an instance of UpdateDocument.
   * @param {any} props
   * @memberof UpdateDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.documents.id,
      title: this.props.documents.title,
      content: this.props.documents.content,
      access: this.props.documents.access
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
/**
 * replace the text input area to CKEDITOR after component mounts
 * @returns {null} no return
 * @memberof UpdateDocument
 */
  componentDidMount() {
    CKEDITOR.replace('content');
  }
/**
 * redirects to the user's document when new props are recieved
 * @param {any} nextProps
 * @returns {null} no return
 * @memberof UpdateDocument
 */
  componentWillReceiveProps() {
    this.props.history.replace(
      `/dashboard/mydocuments/${this.props.status.id}`);
  }
  /**
   * sets the state to the input value
   * @param {any} event
   *@returns {null} no return
   * @memberof UpdateDocument
   */
  onInputChange(event) {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  /**
   * calls the updatedocument action on form submit
   * @param {any} event
   *@returns {null} no return
   * @memberof UpdateDocument
   */
  onFormSubmit(event) {
    event.preventDefault();
    const data = CKEDITOR.instances.content.getData();
    const newDocument = this.state;
    newDocument.content = data;
    this.props.updateDocument(newDocument);
  }

  /**
   *
   *
   * @returns {html} DOM element
   *
   * @memberof UpdateDocument
   */
  render() {
    return (
      <div className="update-document row col s12 m12 l9">
        <form className="col s10" onSubmit={this.onFormSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="title"
                type="text"
                className="validate"
                value={this.state.title}
                onChange={this.onInputChange}
              />
              <label htmlFor="title">.</label>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  value={this.state.content}
                  onChange={this.onInputChange}
                />
                <label htmlFor="content">.</label>
              </div>
            </div>
            <div className="input-field col s12">
              <select
                className="browser-default"
                id="access"
                value={this.state.access}
                onChange={this.onInputChange}
              >
                <option value="" disabled>Visibility</option>
                <option value="public">public</option>
                <option value="private">private</option>
                <option value="role">role</option>
              </select>
            </div>
          </div>
          <button className="btn-doc waves-effect waves-light btn">
            Update
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps =
  dispatch => bindActionCreators({ updateDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents,
  status: state.auth.user
});

UpdateDocument.getDefaultProps = {
  documents: {},
  title: '',
  content: '',
  updateDocument: () => { },
  history: {},
  status: {},
};
UpdateDocument.propTypes = {
  documents: PropTypes.shape({
    id: PropTypes.number,
    ownerID: PropTypes.ownerID,
    title: PropTypes.title,
    content: PropTypes.content,
    access: PropTypes.access,
  }),
  updateDocument: PropTypes.func,
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
  status: PropTypes.shape({
    id: PropTypes.number
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateDocument);
