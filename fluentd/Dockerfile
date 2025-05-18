FROM fluent/fluentd:v1.16-1

# Use root account to use apk
USER root

# Install dependencies and plugins
RUN apk add --no-cache --update \
    sudo build-base ruby-dev curl \
 && sudo gem install \
    fluent-plugin-elasticsearch \
    fluent-plugin-rewrite-tag-filter \
 && sudo gem sources --clear-all \
 && apk del build-base ruby-dev \
 && rm -rf /tmp/* /var/tmp/* /usr/lib/ruby/gems/*/cache/*.gem

# Copy configuration files
COPY fluent.conf /fluentd/etc/
COPY entrypoint.sh /bin/

# Set permissions
RUN chmod +x /bin/entrypoint.sh && \
    chmod -R 777 /fluentd/log

USER fluent

# Expose ports
EXPOSE 24224 24224/udp 24220

# Start Fluentd
CMD ["fluentd", "-c", "/fluentd/etc/fluent.conf", "-p", "/fluentd/plugins"]