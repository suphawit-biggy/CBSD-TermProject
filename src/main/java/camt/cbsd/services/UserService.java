package camt.cbsd.services;

import camt.cbsd.entity.RegisterEntity;
import camt.cbsd.entity.security.User;

/**
 * Created by Biggy's Dell Laptop on 5/15/2017.
 */
public interface UserService {
    User addUser(RegisterEntity registerEntity);
}
