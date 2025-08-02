import { AppLink } from "../../../AppLink";

interface ProfileImageProps {
  profileImage?: string | null | undefined;
  name: string;
}

const ProfileImage = ({ profileImage, name }: ProfileImageProps) => {
  return (
    <div className="avatar avatar-placeholder ">
      <div className="bg-base-300 text-gray-400  mask mask-squircle h-12 w-12 shadow-md">
        {profileImage ? (
          <img src={`${AppLink.images}/${profileImage}`} alt={name} />
        ) : (
          <span className="text-xl">{name.charAt(0)}</span>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;
