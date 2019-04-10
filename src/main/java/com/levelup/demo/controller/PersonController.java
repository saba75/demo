package com.levelup.demo.controller;


import com.levelup.demo.model.entity.Person;
import com.levelup.demo.model.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("users")
public class PersonController {
    @Autowired
    private PersonService personService;

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "register.do",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Person register(@RequestBody Person person) throws Throwable {
        System.out.println("register.do called");

        personService.insert(person);
        return person;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "update.do",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Person update(@RequestBody Person person) throws Throwable {
        System.out.println("update.do called");
        personService.update(person);
        System.out.println(person.toString());

        return person;
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("remove.do/{id}")
    public void remove(@PathVariable("id") int id) throws Throwable {
        System.out.println("remove.do called");

        personService.remove(id);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "getUser.do/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Person getUser(@PathVariable("id") int id) throws Throwable {
        System.out.println("getUser.do called");
        Person fetchedPerson = personService.get(id);
        System.out.println(fetchedPerson.toString());

        return fetchedPerson;


    }
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "allUsers.do",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Person> getUsers() throws Throwable {
        System.out.println("allUser.do called");
        System.out.println(personService.getList());

        return personService.getList();

    }
}
