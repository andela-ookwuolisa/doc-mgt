import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getSingleDocument } from '../actions/DocumentActions';
import ShowSingleDocument from '../components/ShowSingleDocument';
import UpdateDocument from '../containers/UpdateDocument';


/**
 *
 *
 * @class GetSingleDocument
 * @extends {Component}
 */
export class GetSingleDocument extends Component {
  /**
   * Creates an instance of GetSingleDocument.
   * @param {any} props
   * @memberof GetSingleDocument
   */
  constructor(props) {
    super(props);
    this.state = {
      document: { createdAt: '' }
    };
    this.updateDocument = this.updateDocument.bind(this);
  }

  /**
   *
   *
   *@returns {null} no return
   * @memberof GetSingleDocument
   */
  componentWillMount() {
    this.props.getSingleDocument(this.props.match.params.id);
  }

  /**
   *
   *
   * @param {any} nextProps
   *@returns {null} no return
   * @memberof GetSingleDocument
   */
  componentWillReceiveProps(nextProps) {
    this.setState({ document: nextProps.documents });
  }

  /**
   * calls the action to update a document
   * @returns {html} DOM element
   * @memberof GetSingleDocument
   */
  updateDocument() {
    this.props.history.replace('/dashboard/updatedocument');
    return <UpdateDocument document={this.state} />;
  }


  /**
   *renders the getSigleDocument component
   * @returns {html} DOM element
   * @memberof GetSingleDocument
   */
  render() {
    return (
      <div>
        <ShowSingleDocument
          document={this.state.document}
          updateDocument={this.updateDocument}
          status={this.props.status}
        />
      </div>
    );
  }
}
const mapDispatchToProps =
  dispatch => bindActionCreators({ getSingleDocument }, dispatch);

const mapStateToProps = state => ({
  documents: state.documentReducer.documents,
  status: state.auth

});

GetSingleDocument.getDefaultProps = {
  documents: {},
  history: {},
  match: {},
  params: {},
  id: '',
  status: {},
  getSingleDocument: () => { },

};
GetSingleDocument.propTypes = {
  documents: PropTypes.shape({
    id: PropTypes.number,
    ownerID: PropTypes.ownerID,
    title: PropTypes.title,
    content: PropTypes.content,
    access: PropTypes.access,
  }),
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
    url: PropTypes.string
  }),
  status: PropTypes.shape({
    valid: PropTypes.bool
  }),
  id: PropTypes.string,
  getSingleDocument: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(GetSingleDocument);
