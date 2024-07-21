export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="flex-[0.2]">sidebar</div>
      <div className="flex-[0.8]">{children}</div>
    </div>
  );
}
