INSERT INTO public."user" (
    id, "fullName", username, email, avatar, bio, "createdAt", "updatedAt"
) VALUES 
    (1, 'John Doe', 'johndoe', 'john@example.com', 'default.jpg', 'Hello, I am John Doe.', NOW(), NOW()),
    (2, 'Jane Smith', 'janesmith', 'jane@example.com', 'default.jpg', 'Nice to meet you!', NOW(), NOW()),
    (3, 'Alice Johnson', 'alicejohnson', 'alice@example.com', 'default.jpg', 'I love coding!', NOW(), NOW());
	
INSERT INTO public.thread (
    id, content, "totalReplies", "userId", "createdAt", "updatedAt"
) VALUES 
    (1, 'Hello, everyone!', 2, 1, NOW(), NOW()),
    (2, 'I have a question.', 0, 2, NOW(), NOW()),
    (3, 'Check out my latest project!', 5, 3, NOW(), NOW());
	
INSERT INTO public.reply (
    id, "userId", "threadId", image, content, "createdAt", "updatedAt"
) VALUES 
    (1, 2, 1, 'default.jpg', 'Hi John, how are you?', NOW(), NOW()),
    (2, 3, 1, 'default.jpg', 'Hello John, nice to see you here!', NOW(), NOW()),
    (3, 1, 3, 'default.jpg', 'Looks great! Good job!', NOW(), NOW()),
    (4, 2, 3, 'default.jpg', 'I really like it!', NOW(), NOW()),
    (5, 3, 3, 'default.jpg', 'Awesome work!', NOW(), NOW());

INSERT INTO public.follow (
    id, "followersId", "followingId", "followAt"
) VALUES 
    (1, 1, 2, NOW()),
    (2, 1, 3, NOW()),
    (3, 2, 1, NOW()),
    (4, 2, 3, NOW()),
    (5, 3, 1, NOW()),
    (6, 3, 2, NOW());
	
INSERT INTO public."like" (
    id, "userId", "threadId", "createdAt", "updatedAt"
) VALUES 
    (1, 1, 1, NOW(), NOW()),
    (2, 1, 3, NOW(), NOW()),
    (3, 2, 1, NOW(), NOW()),
    (4, 3, 2, NOW(), NOW()),
    (5, 3, 3, NOW(), NOW());

SELECT * FROM public."user";

