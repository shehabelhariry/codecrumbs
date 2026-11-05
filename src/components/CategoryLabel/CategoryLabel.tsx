import type { Category } from "@/lib/posts"
import styles from "./CategoryLabel.module.scss"

const icons: Record<Category, string> = {
  code: "M8 7 3 12l5 5M16 7l5 5-5 5M14 5l-4 14",
  life: "M12 21v-9m0 0c0-4.5 3-7 7.5-7 0 4.5-3 7-7.5 7Zm0 2.5C12 10.5 9.5 8 5 8c0 3.5 2.5 6 7 6",
  thoughts: "M12 3.5 13.9 9l5.6 2-5.6 2L12 18.5 10.1 13l-5.6-2 5.6-2L12 3.5Z",
}

// Category name followed by its small coloured icon
export default function CategoryLabel({ category }: { category: Category }) {
  return (
    <span className={styles.label}>
      <span className={styles.name}>{category}</span>
      <svg
        className={`${styles.icon} ${styles[category]}`}
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <path
          d={icons[category]}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
