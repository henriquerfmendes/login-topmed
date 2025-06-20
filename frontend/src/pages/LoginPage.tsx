import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateLoginSafe, type LoginFormData } from '../schemas/authSchemas';
import styles from '../styles/shared.module.css';
import type { AxiosError } from 'axios';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Conta criada com sucesso! Agora você pode fazer login.');
    }
  }, [searchParams]);

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setErrors({});
    setSuccess('');
    setLoading(true);

    const validation = validateLoginSafe(formData);
    
    if (!validation.success) {
      const fieldErrors: Partial<LoginFormData> = {};
      validation.error.errors.forEach(error => {
        const field = error.path[0] as keyof LoginFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      await login(validation.data);
      navigate('/success');
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message || 'Erro ao fazer login';
        
        setErrors({ email: errorMessage });
      } else {
        setErrors({ email: 'Erro de conexão. Verifique sua internet e tente novamente.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.formTitle}>Entrar</h1>
          <p className={styles.formSubtitle}>Faça login na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
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
              placeholder="Sua senha"
            />
            {errors.password && (
              <div className={styles.errorMessage}>
                {errors.password}
              </div>
            )}
          </div>

          {success && (
            <div className={styles.successMessage}>
              {success}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={styles.primaryButton}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className={styles.formFooter}>
          <p className={styles.formFooterText}>
            Não tem uma conta?{' '}
            <Link to="/register" className={styles.link}>
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 