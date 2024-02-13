
type Props = {
  children: React.ReactNode;
};
export default function RootLayout({
  children,
}: Props) {
  // const messages = useMessages();
  console.log("Logging from root ")
  return children;
}
