import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/SuccessPage.module.css';

const SuccessPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>✓</span>
          </div>
          <h1 className={styles.title}>Login realizado com sucesso!</h1>
        </div>

        <div className={styles.userInfo}>
          <h2 className={styles.userInfoTitle}>Informações do usuário:</h2>
          <div className={styles.userInfoList}>
            <p className={styles.userInfoItem}>
              <span className={styles.userInfoLabel}>Nome:</span> {user?.fullName}
            </p>
            <p className={styles.userInfoItem}>
              <span className={styles.userInfoLabel}>Email:</span> {user?.email}
            </p>
            <p className={styles.userInfoItem}>
              <span className={styles.userInfoLabel}>Último login:</span> {user?.lastLogin ? new Date(user.lastLogin).toLocaleString('pt-BR') : 'Primeiro acesso'}
            </p>
          </div>
        </div>

        <button 
          onClick={handleLogout} 
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SuccessPage; 