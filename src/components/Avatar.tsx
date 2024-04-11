type Props = {
  letter?: string;
};

const Avatar = ({ letter }: Props) => {
  return (
    <div className="avatar placeholder" role="button">
      <div className="bg-neutral text-neutral-content rounded-full w-12">
        <span>{letter}</span>
      </div>
    </div>
  );
};
export default Avatar;
