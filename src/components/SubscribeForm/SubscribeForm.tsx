import Button from "@/components/Button/Button"
import styles from "./SubscribeForm.module.scss"

const MAILCHIMP_ACTION =
  "https://netlify.us4.list-manage.com/subscribe/post?u=00df214eb4af39941cd2da674&id=57e40dd829"
// Mailchimp's bot trap: real people leave this hidden field empty
const HONEYPOT_NAME = "b_00df214eb4af39941cd2da674_57e40dd829"

export default function SubscribeForm() {
  return (
    <section className={styles.subscribe}>
      <div className={`container ${styles.inner}`}>
        <p>Get new posts by email.</p>
        <form action={MAILCHIMP_ACTION} method="post" target="_blank">
          <input
            type="email"
            name="EMAIL"
            placeholder="you@example.com"
            aria-label="Email address"
            required
          />
          <Button type="submit" name="subscribe" appearance="primary">
            Subscribe
          </Button>
          <div className={styles.honeypot} aria-hidden="true">
            <input type="text" name={HONEYPOT_NAME} tabIndex={-1} />
          </div>
        </form>
      </div>
    </section>
  )
}
