
const waitFor =  (selector) =>{
  return new Promise((resolve, reject) => {
    // check for html element every #ms
    const interval = setInterval(()=> {
      if (document.querySelector(selector)){
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    },30);
    // if element not present then reject promise
    const timeout = setTimeout(()=>{
      clearInterval(interval);
      reject();
    },2000)
  });
}

// hook function globally defined by Mocha
// runs before each assert test
beforeEach(() => {
  document.querySelector('#target').innerHTML = '';
  createAutoComplete({
    root: document.querySelector('#target'),
    fetchData() {
      return [
        { Title: 'Avengers'},
        { Title: 'Thor'},
        { Title: 'New Avengers'},
        { Title: 'Arse Bandits'},
        { Title: 'Spaceballs'}
      ]
    },
    renderOption(movie){
      return movie.Title;

    }
  })

})

it('Dropdown starts closed!!', () =>{
 
  const dropdown = document.querySelector('.dropdown');
  expect(dropdown.className).not.to.include('is-active');
})

it('After searching, dropdown opens up', async () =>{
  const input = document.querySelector('input');
  input.value = 'Avengers';
  input.dispatchEvent(new Event('input'));
  await waitFor('.dropdown-item');
  const dropdown = document.querySelector('.dropdown');
  expect(dropdown.className).to.include('is-active');
})

it('After searching, displays some results', async ()=>{
  const input = document.querySelector('input');
  input.value = 'Avengers';
  input.dispatchEvent(new Event('input'));
  await waitFor('.dropdown-item');

  const items = document.querySelectorAll('.dropdown-item');
  expect(items.length).to.equal(5);
})