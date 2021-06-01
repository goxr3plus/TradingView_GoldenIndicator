//@version=4
study(title="Relative Strength Index", shorttitle="Golden RSI", format=format.price, precision=2, resolution="")


rsiLength = input(14, minval=1, title="Length")
rsiSource = input(close, "Source", type = input.source)
rsi = rsi(rsiSource, rsiLength)

plot(rsi, "RSI", color=color.yellow)


band1 = hline(70, "Upper Band", color=#C0C0C0)
band0 = hline(30, "Lower Band", color=#C0C0C0)

fill(band1, band0, color=color.new(color.yellow,95), transp=90, title="Background")
