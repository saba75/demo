package com.levelup.demo.model.service;

import com.levelup.demo.model.entity.Person;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
@Transactional
@CrossOrigin(origins = "http://localhost:4200")
public class PersonService {
    @PersistenceContext
    private EntityManager entityManager;
    public void insert(Person person) {
        entityManager.persist(person);
    }

    public List<Person> getList() throws IllegalAccessException, InstantiationException {
        return entityManager.createQuery("select x from person x").getResultList();
    }

    public Person get(int id) throws IllegalAccessException, InstantiationException {


        Person person = (Person) entityManager.createQuery("select entity from person entity where entity.id=:id")
                .setParameter("id", id)
                .getSingleResult();
        return person;
    }

    public void remove(int id) throws InstantiationException, IllegalAccessException {
        Person mergeEntity = entityManager.merge(get(id));
        entityManager.remove(mergeEntity);
    }

    public void update(Person entity) {
        Person mergeEntity = entityManager.merge(entity);
        entityManager.persist(mergeEntity);
    }
}




