import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the documents
 * @param {any} props
 * @returns {html} DOM elements
 */
const ShowDocument = ({
  title,
  content,
  access,
  id,
  ownerID,
  user,
  deleteDocument,
  firstName,
  lastName
}) => (
  <div>
    <div className="col s4 m4">
      <div className="card white">
        <div className="card-content black-text">
          <span className="card-title">{title}</span>
          <div
            className="card-abstract"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <span className="card-name">{`${firstName} ${lastName}`}</span>
          <span className="doc-access">{access}</span>
        </div>

        <div className="card-action">
          { ((ownerID === user.id) || (user.roleID === 1)) && <div><a
            className="btn-floating waves-effect card-btn-delete btn"
            role="button"
            tabIndex="-1"
            id="delete-doc"
            onClick={() => { deleteDocument(id); }}
          >
            <i className="material-icons left">delete</i>Delete
          </a> </div>}
          <a
            href={`/#/dashboard/document/${id}`}
            className="btn-floating waves-effect  btn"
            id="viewdoc"
          ><i className="material-icons left">visibility</i>View</a>
          <div className="clear" />
        </div>
      </div>
    </div>
  </div>
);
ShowDocument.getDefaultProps = {
  document: {},
  title: '',
  content: '',
  id: 0,
  ownerID: 0,
  access: '',
  firstName: '',
  lastName: '',
  user: {}
};
ShowDocument.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  access: PropTypes.string,
  id: PropTypes.number,
  ownerID: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  deleteDocument: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    roleID: PropTypes.number
  }),
};


export default ShowDocument;
