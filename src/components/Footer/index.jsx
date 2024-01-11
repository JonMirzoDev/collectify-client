import styles from './style.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerItem}>© 2024 Collectify</div>
      <div className={styles.footerItem}>About Us</div>
      <div className={styles.footerItem}>Contact</div>
    </footer>
  )
}

export default Footer
