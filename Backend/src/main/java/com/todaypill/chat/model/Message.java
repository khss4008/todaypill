package com.todaypill.chat.model;


import java.util.Date;
import lombok.*;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
	private String _id;
	private String text;
    private String senderName;
    private String createdAt;
    private Status status;
    private User user;
    private Integer supplementId;
}
