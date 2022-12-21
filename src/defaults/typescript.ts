export const defaultTypeScript = `
function App() {

  function handleClick() {
    console.log('teste');
    alert('teste')
  }

  return (
    <Button onClick={() => handleClick()}>teste</Button>
  );
}

function Button(props: React.PropsWithChildren<{}> & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
    </button>
  );
}

// main.ts
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
`;
