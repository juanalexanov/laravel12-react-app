<h2>Halo {{ $user->name }},</h2>

<p>Ini adalah pengingat untuk seminar:</p>

<p>
  <strong>{{ $seminar->title }}</strong><br>
  Tanggal: {{ \Carbon\Carbon::parse($seminar->eventDate)->format('d M Y') }}<br>
  Waktu: {{ $seminar->eventTime }}<br>
  Link: <a href="{{ $seminar->googleMeetLink }}">{{ $seminar->googleMeetLink }}</a>
</p>

<p>Terima kasih, sampai jumpa di seminar!</p>
