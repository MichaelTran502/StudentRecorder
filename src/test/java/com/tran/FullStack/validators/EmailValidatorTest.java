package com.tran.FullStack.validators;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;



class EmailValidatorTest {

    private final EmailValidator emailTest = new EmailValidator();

    @Test
    void isValidEmail() {
        Assertions.assertThat(emailTest.test("example@gmail.com")).isTrue();
    }

    @Test
    void isNotValidEmail() {
        Assertions.assertThat(emailTest.test("hello.com")).isFalse();
    }
}