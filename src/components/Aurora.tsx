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
      className={`tp-[80%] pointer-events-none absolute left-[50%] h-[700px] w-[1800px] max-w-full translate-x-[-50%] translate-y-[-50%] transform`}
    />
  );
};
