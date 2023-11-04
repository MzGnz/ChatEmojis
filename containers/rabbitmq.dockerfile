FROM rabbitmq:3-management-alpine
RUN rabbitmq-plugins enable --offline rabbitmq_web_stomp
EXPOSE 15691
EXPOSE 15692
EXPOSE 25672
EXPOSE 4369
EXPOSE 5671
EXPOSE 5672
EXPOSE 15674
EXPOSE 15672