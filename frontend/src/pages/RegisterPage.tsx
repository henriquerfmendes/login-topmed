import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateRegisterSafe, type RegisterFormData } from '../schemas/authSchemas';
import styles from '../styles/shared.module.css';
import type { AxiosError } from 'axios';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const validation = validateRegisterSafe(formData);
    
    if (!validation.success) {
      const fieldErrors: Partial<RegisterFormData> = {};
      validation.error.errors.forEach(error => {
        const field = error.path[0] as keyof RegisterFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      await register({
        fullName: validation.data.fullName,
        email: validation.data.email,
        password: validation.data.password
      });
      navigate('/?registered=true');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Erro ao criar conta';
      setErrors({ email: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Criar Conta</h1>
          <p className={styles.formSubtitle}>Registre-se para começar</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.formLabel}>
              Nome Completo
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`${styles.formInput} ${errors.fullName ? styles.error : ''}`}
              placeholder="Seu nome completo"
            />
            {errors.fullName && (
              <div className={styles.errorMessage}>
                {errors.fullName}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`${styles.formInput} ${errors.email ? styles.error : ''}`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <div className={styles.errorMessage}>
                {errors.email}
              </div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`${styles.formInput} ${errors.password ? styles.error : ''}`}
              placeholder="Mínimo 8 caracteres"
            />
            {errors.password && (
              <div className={styles.errorMessage}>
                {errors.password}
              </div>
            )}
            <div className={styles.helpText}>
              Deve conter pelo menos uma letra maiúscula, uma minúscula e um número
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={`${styles.formInput} ${errors.confirmPassword ? styles.error : ''}`}
              placeholder="Confirme sua senha"
            />
            {errors.confirmPassword && (
              <div className={styles.errorMessage}>
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={styles.primaryButton}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div className={styles.formFooter}>
          <p className={styles.formFooterText}>
            Já tem uma conta?{' '}
            <Link to="/" className={styles.link}>
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 