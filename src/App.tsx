import React, { ReactElement, ReactNode, useState } from 'react';
import './App.css';

// Conventional props
function Heading({ title }: { title?: string }) {
  return <h1>{title}</h1>;
}

// --------------- Old way
// const HeadingFC: React.FC<{ title: string }> = ({ title }) => <h1>{title}</h1>;
// ---------------

function HeadingWithContent({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <h1>{children}</h1>;
}

// -------------------------------------------------
// Default props
const defaultContainerProps = {
  heading: <strong>My Heading</strong>,
};

type ContainerProps = {
  children: ReactNode;
} & typeof defaultContainerProps;

function Container({ heading, children }: ContainerProps): ReactElement {
  return (
    <div>
      <h1>{heading}</h1>
      {children}
    </div>
  );
}

Container.defaultProps = defaultContainerProps;

// -------------------------------------------------
// Functional props
function TextWithNumber({
  header,
  children,
}: {
  header: (num: number) => ReactNode;
  children: (num: number) => ReactNode;
}) {
  const [state, setState] = useState(1);
  // or
  // const [state2, setState2] = useState<number | null>(null);

  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <h3>{children(state)}</h3>
      <h4>{state}</h4>
      <div>
        <button onClick={() => setState(state + 1)}>Add</button>
      </div>
    </div>
  );
}

// -------------------------------------------------
// List
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div className='App'>
      <Heading title='Hello there' />
      <HeadingWithContent>
        <strong>Hi!</strong>
      </HeadingWithContent>
      <Container heading={<strong>My New Heading</strong>}>Foo</Container>
      <TextWithNumber header={(num: number) => <span>Header {num}</span>}>
        {(num: number) => <div>Today's number is {num}</div>}
      </TextWithNumber>
      <List
        items={['Lazar', 'Vuk', 'Goran']}
        render={(item: string) => <>{item.toUpperCase()}</>}
      ></List>
    </div>
  );
}

export default App;
