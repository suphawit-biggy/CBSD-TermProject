package camt.cbsd.services;

import camt.cbsd.entity.RegisterEntity;
import camt.cbsd.entity.security.Authority;
import camt.cbsd.entity.security.AuthorityName;
import camt.cbsd.entity.security.User;
import camt.cbsd.security.repository.AuthorityRepository;
import camt.cbsd.security.repository.UserRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;

/**
 * Created by Biggy's Dell Laptop on 5/15/2017.
 */
@Service
@ConfigurationProperties(prefix = "server")
public class UserServiceImpl implements UserService{

    @Autowired
    AuthorityRepository authorityRepository;

    @Autowired
    UserRepository userRepository;

    @Transactional
    @Override
    public User addUser(RegisterEntity registerEntity) {
        Authority authority;
        if (registerEntity.getRole().equals("Admin")){
            authority = authorityRepository.findByName(AuthorityName.ROLE_ADMIN);
        }else if (registerEntity.getRole().equals("Staff")){
            authority = authorityRepository.findByName(AuthorityName.ROLE_STAFF);
        }else {
            authority = authorityRepository.findByName(AuthorityName.ROLE_USER);
        }
        User user = User.builder().username(registerEntity.getUsername())
                .password(registerEntity.getPassword())
                .firstname("default name")
                .lastname("default surname")
                .email("default @default")
                .lastPasswordResetDate(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .authorities(Arrays.asList(authority))
                .enabled(true)
                .build();
        user = userRepository.save(user);
        Hibernate.initialize(user.getAuthorities());
        return user;
    }
}
