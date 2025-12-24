import Button from "../shared/Button";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between p-4 md:px-12 md:py-4 border-t border-neutral-300 items-center gap-4 text-neutral-300">
      <p className="">
        Created with ❤ by <span className="font-bold">Haytham</span>
      </p>
      <a href="https://haytham-saba.vercel.app/" target="_blank">
        <Button
          className="text-white"
          content="More About Me !"
          variant="outline"
        />
      </a>
      <p>Merry Christmas 🎅</p>
    </div>
  );
};

export default Footer;
