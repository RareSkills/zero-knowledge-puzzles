import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
export default function Footers() {
  return (
    <div className={styles.footer}>
      <Image
        className={styles.logo}
        src="/RareSkills.jpg"
        alt="Rareskills Logo"
        width={70}
        height={70}
        priority
      />
      <p > By <Link href="https://www.rareskills.io">Rareskills.io</Link></p>
    </div>
  );
}
