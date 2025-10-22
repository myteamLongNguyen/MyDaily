import themeConfig from "../core/configs/theme-config";

export default function Footer() {
  return (
    <div className="text-text-primary h-8 w-full text-center text-text-title text-xs content-center">
      {`© 2025 ${themeConfig.appName}`}
    </div>
  );
}
