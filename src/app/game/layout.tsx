import NavBar from "../components/NavBar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <NavBar />
      {children}
    </section>
  );
};

export default layout;
