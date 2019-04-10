package com.levelup.demo.model.entity;

import javax.persistence.*;

@Entity(name = "person")
@Table(name = "PERSON")
public class Person {
    @Id
    @Column(name = "ID", columnDefinition = "INT")
    @SequenceGenerator(name = "SEQ", sequenceName = "SEQ", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQ")
    private int id;
    @Column(name = "name", columnDefinition = "NVARCHAR(255)")
    private String name;
    @Column(name = "userName", columnDefinition = "NVARCHAR(255)")
    private String username;
    @Column(name = "email", columnDefinition = "NVARCHAR(255)")
    private String email;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
