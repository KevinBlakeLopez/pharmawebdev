import { useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import {
  Container,
  NavigationMenu,
  SkipNavigationLink,
} from "../../components";
import styles from "./Header.module.scss";

let cx = classNames.bind(styles);

export default function Header({
  title = "Headless by WP Engine",
  description,
  menuItems,
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  return (
    <header className="relative z-[2]">
      <SkipNavigationLink />
      <Container>
        <div className="flex justify-between flex-wrap py-12 gap-4">
          <div className="font-bold text-2xl flex flex-col justify-center">
            <Link href="/">
              <a className={cx("title")}>{title}</a>
            </Link>
            {description && <p className={cx("description")}>{description}</p>}
          </div>
          <button
            type="button"
            className="text-3xl text-black bg-transparent items-center border-solid border-2 flex m-0 py-2 px-4 cursor-pointer transition-all ease-in duration-200 hover:bg-white hover:text-black focus:bg-white focus:text-black md:hidden"
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={cx("primary-navigation")}
            aria-expanded={isNavShown}
          >
            ☰
          </button>
          <NavigationMenu
            className={cx([
              "primary-navigation",
              isNavShown ? "show" : undefined,
            ])}
            menuItems={menuItems}
          />
        </div>
      </Container>
    </header>
  );
}
