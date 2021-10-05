import toast from 'react-hot-toast';
import s from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const handleSearch = e => {
    e.preventDefault();
    if (e.target.elements.searchName.value.toLowerCase().trim() === '') {
      return toast.error('The search field is empty!');
    }
    onSearch(e.target.elements.searchName.value.toLowerCase());
    e.target.reset();
  };

  return (
    <div className={s.div}>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          className={s.input}
          type="text"
          name="searchName"
          autoComplete="off"
          autoFocus
          placeholder="Enter movie name"
        />
        <button className={s.button} type="submit">
          <span className={s.span}>Search</span>
        </button>
      </form>
    </div>
  );
}
