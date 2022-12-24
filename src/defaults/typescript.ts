export const defaultTypeScript = `
function App() {
  const [ contador, setContador ] = React.useState(1);

  function handleClick() {
    setContador(contador + 1);
  }

  return (
    <Button onClick={() => handleClick()}>{contador} + 1</Button>
  );
}

function Button(props: React.PropsWithChildren<{}> & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
    </button>
  );
}

// main.ts
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
`;
