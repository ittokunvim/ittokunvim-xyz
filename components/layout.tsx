import Font from "./font";

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      {children}
      <Font />
    </>
  );
}
