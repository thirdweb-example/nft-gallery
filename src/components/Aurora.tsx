interface AuroraProps {
  size: { width: string; height: string };
  pos: { top: string; left: string };
  color: string;
}

export const Aurora: React.FC<AuroraProps> = ({ color, pos, size }) => {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(ellipse at center, ${color}, transparent 60%)`,
      }}
      className={`pointer-events-none w-[1800px] h-[700px] absolute tp-[80%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] max-w-full`}
    />
  );
};
