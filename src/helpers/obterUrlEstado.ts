export function obterUrlEstado(): {
  html: string;
  scss: string;
  typescript: string;
} {
  if (location.hash.includes('#')) {
    try {
      const { html, scss, typescript } = JSON.parse(
        atob(location.hash.replace(/^#/g, ''))
      );
      return {
        html,
        scss,
        typescript,
      };
    } catch (error) {
      console.log('não conseguiu obter state', error);
    }
  }
  return {
    html: defaultHtml,
    scss: defaultScss,
    typescript: defaultTypeScript,
  };
}

const defaultHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
</head>

<body>
  <div id="root"></div>
</body>

</html>`.trim();

const defaultScss = `
#root {
  font-size: normal;
}
`.trim();

const defaultTypeScript = `
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
`.trim();
