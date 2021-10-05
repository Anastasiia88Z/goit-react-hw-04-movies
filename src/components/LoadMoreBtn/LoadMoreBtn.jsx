import PropTypes from 'prop-types';

function LoadMoreBtnClick({ onClick }) {
  return (
    <div>
      <button type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtnClick;

LoadMoreBtnClick.propTypes = {
  onClick: PropTypes.func.isRequired,
};
