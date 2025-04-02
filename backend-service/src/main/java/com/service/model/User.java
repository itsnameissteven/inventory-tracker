package com.service.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Table(name = "users")
@Entity
public class User extends BaseModel<User> implements UserDetails {
  @Column(unique = true, nullable=false)
  private String username;

  @Column(nullable = false)
  private String password;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
      return List.of();
  }

  public String getPassword() {
      return password;
  }

  @Override
  public String getUsername() {
      return username;
  }
  
  public User setPassword(String password) {
      this.password = password;
      return this;
  }
  public User setUsername(String username) {
      this.username = username;
      return this;
  }


  @Override
  public boolean isAccountNonExpired() {
      return true;
  }

  @Override
  public boolean isAccountNonLocked() {
      return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
      return true;
  }

  @Override
  public boolean isEnabled() {
      return true;
  }
}
